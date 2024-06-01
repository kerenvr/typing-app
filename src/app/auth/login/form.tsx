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
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/auth/form-error";
import { Login } from "../../../../actions/login";
import { useState, useTransition } from "react";
import { FormSuccess } from "@/components/auth/form-success";


export const FormSchema = z.object({
    username: z.string ({
      message: "A username must be provided.",
    }),
    password: z.string().min(1, {
      message: "A password must be provided.",
    }),
  });
  
  export type FormData = z.infer<typeof FormSchema>;

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition(); 
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      });

      const onSubmit = async (data: FormData) => {
        console.log(Login(data))
        setError("");
        setSuccess("");
        startTransition(() => {
            Login(data)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        });
      }

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account? Sign up"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form} >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4 w-full"
                >
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
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button 
                        type="submit"
                        className=""
                        variant="outline"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}