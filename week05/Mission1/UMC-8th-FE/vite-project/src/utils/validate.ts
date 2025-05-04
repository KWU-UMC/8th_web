export type UserSiginInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserSiginInformation){
    const errors = {
        email: "", //여기에 에러 메시지가 갈 에정
        password: "",
    };

    if(
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        .test(values.email)){
            errors.email = "올바른 이메일 형식이 아닙니다.";
    }

    // 비밀번호 8자 20자 사이
    if(!(values.password.length >= 8 && values.password.length < 20)){
        errors.password = "비민ㄹ번호는 8-20자 사이로 입력해주세요.";
    }

    return errors;
}

//로그인 유효성 검사
function validateSignin (values: UserSiginInformation){
    return validateUser(values);
}

export {validateSignin};