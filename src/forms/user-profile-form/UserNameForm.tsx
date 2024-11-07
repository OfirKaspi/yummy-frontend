import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { User } from "@/types"

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
})

type UserNameFormData = z.infer<typeof formSchema>

type Props = {
    currentUser: User
    onSave: (userNameData: UserNameFormData) => void
    isLoading: boolean
}

const UserNameForm = ({ currentUser, onSave, isLoading }: Props) => {
    const form = useForm<UserNameFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: currentUser.name, email: currentUser.email },
    })

    useEffect(() => {
        form.reset({ name: currentUser.name })
    }, [currentUser.name, form])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 max-w-[500px]">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isLoading ? <LoadingButton /> : <Button type="submit" className="bg-orange-500 hover:bg-orange-400 dark:text-white">Submit</Button>}
            </form>
        </Form>
    )
}

export default UserNameForm
