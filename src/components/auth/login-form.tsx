import { CardWrapper } from "./card-wrapper"

export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account? Sign up"
            backButtonHref="/auth/register"
            showSocial
        >
            LoginFrom
        </CardWrapper>
    )
}