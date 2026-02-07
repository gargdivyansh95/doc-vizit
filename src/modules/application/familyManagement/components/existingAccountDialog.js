import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RequestAccessSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

const requestAccess = [
    {
        id: 'view',
        label: 'View Only',
    },
    {
        id: 'manage',
        label: 'Upload & manage',
    },
    {
        id: 'full',
        label: 'Full access',
    }
]

export default function ExistingAccountDialog({open, onClose}) {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(RequestAccessSchema),
        mode: 'onSubmit',
        defaultValues: {
            requestAccess: '',
        },
    });

    const onSubmit = (data) => {
        console.log(data, 'dd')
        reset();
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="lg:max-w-md [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 px-6 pt-3 pb-6">
                <DialogHeader className="gap-1">
                    <DialogTitle className="text-xl font-semibold text-black text-center">This family member already<br/>has a e-DigiHealth account.</DialogTitle>
                </DialogHeader>
                <div className="space-y-1 mt-4">
                    <Label className="text-sm font-medium text-black">Request access</Label>
                    <Controller
                        name="requestAccess"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger
                                    className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                        focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                        ${errors.requestAccess ? 'border-red-500' : 'border-brand-gray'}`}
                                >
                                    <SelectValue placeholder="Select Request access level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {requestAccess.map((ele) => (
                                        <SelectItem className='cursor-pointer' key={ele.id} value={ele.id}>
                                            {ele.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.requestAccess && (
                        <p className="text-xs text-red-500 font-medium">{errors.requestAccess.message}</p>
                    )}
                </div>
                <DialogFooter className='mt-2'>
                    <Button
                        type="submit"
                        size={'lg'}
                        className="w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Send Request
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
