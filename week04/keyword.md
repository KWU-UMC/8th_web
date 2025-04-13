### React-hook-form
- React에서 폼 관리를 효율적으로 도와주는 라이브러리
- register, handleSubmit, formState 등 유틸 함수 제공
- 다른 라이브러리(zod, yup 등)와 연동해 유효성 검사가 쉽다. 
### zod
- 스키마 기반 유효성 검사 라이브러리
- 객체의 구조와 조건을 정의하고 검증 가능
```
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```