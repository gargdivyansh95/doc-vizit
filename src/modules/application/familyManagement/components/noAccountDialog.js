import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function NoAccountDialog({open, onClose}) {

    const handleConfirm = () => {
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="lg:max-w-md [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 px-6 pt-3 pb-6">
                <DialogHeader className="gap-1">
                    <DialogTitle className="text-xl font-semibold text-black text-center">This member doesn’t have a <br/>e-DigiHealth account yet.</DialogTitle>
                    <DialogDescription className="text-center text-brand-dark-green text-base font-medium mt-3">
                        You will manage their health records.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mt-2'>
                    <Button
                        type="submit"
                        size={'lg'}
                        className="w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        onClick={handleConfirm}
                    >
                        Sounds Good
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
