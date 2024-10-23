"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UpdatePasswordSchema } from "@/schemas";
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
import { UpdatePassword } from "../../../actions/update-password";
import { useState, useTransition } from "react";
import { FormSuccess } from "@/components/auth/form-success";
import { useSession } from "next-auth/react";

export const PasswordSettingsForm = () => {
  const { data: session, update } = useSession();
  const user = session?.user;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdatePasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      UpdatePassword(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <div className="bg-white round ed-[40px] space-y-4 px-12 py-10  shad ow-2xl ">
      <Form {...form}>
        <p className="text-slate-500 text-xs">Password</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-full">
          <FormField
            control={form.control}
            name="currPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={isPending}
                    {...field}
                    type="password"
                    placeholder="************"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={isPending}
                    {...field}
                    type="password"
                    placeholder="************"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat New Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={isPending}
                    {...field}
                    type="password"
                    placeholder="************"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <button type="submit" className="bg-[#F8FAFC] p-2 rounded-full text-sm w-1/2">
            Save Changes
          </button>
        </form>
      </Form>
    </div>
  );
};
