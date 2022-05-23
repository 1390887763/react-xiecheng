import React from "react";
import { UserLayout } from "../../layout/userLayout"
import { SingInForm } from "./SignInForm";

export const SignInPage : React.FC = () => {
    return (
        <UserLayout>
            <SingInForm />
        </UserLayout>
    )
} 