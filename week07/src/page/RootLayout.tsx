import {Navigation} from "./Navigation.tsx";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import client from "../util/client.ts";
import useLocalStorage from "../hooks/useLocalStorage.ts";
import CloseableDialog from "../ui/CloseableDialog.tsx";

const SideBar = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [, setAccessToken] = useLocalStorage<string | undefined>('accessToken', undefined);
    const [, setRefreshToken] = useLocalStorage<string | undefined>('refreshToken', undefined);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

    const deleteAccountMutation = useMutation({
        mutationFn: async () => {
            return client.delete('/v1/users/me');
        },
        onSuccess: () => {
            setAccessToken(undefined);
            setRefreshToken(undefined);
            queryClient.clear();
            alert('계정 삭제 성공');
            navigate('/signin');
        },
        onError: () => {
            alert('계정 삭제 실패');
        },
        onSettled: () => {
            setShowConfirmDeleteDialog(false);
        }
    });

    const handleDeleteClick = () => {
        setShowConfirmDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        deleteAccountMutation.mutate();
    };

    return <div className="h-full flex flex-col bg-neutral-800 py-8">
        <ul className="flex flex-1 flex-col gap-4 px-4 w-70">
            <li className="text-white text-lg">찾기</li>
            <Link to='/my'><li className="text-white text-lg">마이페이지</li></Link>
        </ul>

        <div>
            <button
                onClick={handleDeleteClick}
                className="text-white text-lg px-4 py-2 hover:bg-neutral-700 w-full text-left"
                disabled={deleteAccountMutation.isPending}
            >
                탈퇴하기
            </button>
        </div>

        {showConfirmDeleteDialog && (
            <CloseableDialog onClickClose={() => setShowConfirmDeleteDialog(false)}>
                <div className="flex flex-col gap-4 text-white w-80">
                    <h2>정말로 탈퇴하시겠습니까?</h2>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => setShowConfirmDeleteDialog(false)}
                            className="px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg"
                            disabled={deleteAccountMutation.isPending}
                        >
                            취소
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white"
                            disabled={deleteAccountMutation.isPending}
                        >
                            {deleteAccountMutation.isPending ? '삭제 중...' : '삭제'}
                        </button>
                    </div>
                </div>
            </CloseableDialog>
        )}
    </div>
}

export const RootLayout = () => {
    const [isVisible, setVisible] = useState(false);

    return (
        <div className="flex flex-col w-screen h-screen">
            <Navigation onClickHamburger={() => setVisible(v => !v)} />

            <div className="relative block md:hidden">
                <div className="absolute top-0 left-0 my-4">
                    <Outlet />
                </div>

                <div
                    className={`${isVisible ? 'block' : 'hidden'} fixed inset-0 bg-black/50 z-5 transition-opacity`}
                    onClick={() => setVisible(false)} />

                <div className={`fixed h-screen top-0 left-0 ${isVisible ? 'visible opacity-100 w-70' : 'invisible opacity-0 w-0'} z-10 transition-width duration-150 ease-in-out`}>
                    <SideBar/>
                </div>
            </div>

            <div className="hidden md:flex flex-1 min-h-0">
                <SideBar/>

                <div className="flex-1 min-h-0 h-full p-4 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
