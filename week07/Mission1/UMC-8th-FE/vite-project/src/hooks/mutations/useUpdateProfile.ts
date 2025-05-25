// hooks/mutations/useUpdateProfile.ts
import { useMutation } from "@tanstack/react-query";
import { patchProfile } from "../../apis/profile";
import { PatchProfileRequestDto } from "../../types/auth";
//import { patchProfile } from "../../apis/user";
//import { UpdateProfileRequest } from "../../types/user";

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: (body: PatchProfileRequestDto) => patchProfile(body),
    });
};
