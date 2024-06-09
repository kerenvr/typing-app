"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/auth/form-error";
import { Register } from "../../../../actions/register";
import { useState, useTransition } from "react";
import { FormSuccess } from "@/components/auth/form-success";
import { RegisterSchema } from "@/schemas";

export type FormData = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            Register(data).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Register"
            backButtonLabel="Already have an account? Sign in"
            backButtonHref="/auth/login"
            showSocial
            width="w-[450px]"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4 w-full"
                >
                <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-black"
                                        disabled={isPending}
                                        placeholder="name"
                                        {...field}
                                        type="text"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-black"
                                        disabled={isPending}
                                        placeholder="email"
                                        {...field}
                                        type="email"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-black"
                                        disabled={isPending}
                                        placeholder="username"
                                        {...field}
                                        type="text"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-black"
                                        disabled={isPending}
                                        placeholder="password"
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="" variant="outline">
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
