"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UpdateProfileSchema } from "@/schemas";
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
import { Update } from "../../../actions/update"
import { useState, useTransition } from "react";
import { FormSuccess } from "@/components/auth/form-success";
import { useSession } from "next-auth/react";

export const ProfileSettingsForm= () => {
  const { data: session, update } = useSession();
  const user = session?.user;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name || undefined,
      username: user?.username || undefined,
      email: user?.email || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      Update(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          };
          if (data?.success) {
            update();
            setSuccess(data.success);
            window.location.reload()
          }
        })
        .catch (() => setError("Something went wrong!"))
    });
  };

  return (
    <div className="bg-white round ed-[40px] space-y-4 px-12 py-10  shad ow-2xl ">
      <Form {...form}>
        <h1 className="font-semibold text-xl">Profile</h1>
        <p className="text-[#9D9D9D] text-sm">User information</p>
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
                    {...field}
                    type="text"
                    placeholder={user?.name}
                  />
                </FormControl>
                <FormMessage />
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
                    {...field}
                    type="text"
                    placeholder={user?.username}
                  />
                </FormControl>
                <FormMessage />
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
                    {...field}
                    type="email"
                    placeholder={user?.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <button type="submit" className=" bg-[#F8FAFC] p-2 rounded-full text-sm w-1/2">Save Changes</button>
        </form>
      </Form>
    </div>
  );
};
