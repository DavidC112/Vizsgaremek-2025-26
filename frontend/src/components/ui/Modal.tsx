import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, type ReactNode } from "react";

export type ModalProps = {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
  actions?: (close: () => void) => ReactNode;
  onClose: () => void;
};

const Modal = ({
  trigger,
  title,
  description,
  children,
  actions,
  onClose,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const close = (): void => {
    setIsOpen(false);
    onClose?.();
  };
  const open = (): void => setIsOpen(true);

  return (
    <>
      <span
        onClick={open}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {trigger}
      </span>

      <Dialog open={isOpen} onClose={close} className="relative z-50">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Centered panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex max-h-[90dvh] w-full max-w-lg flex-col space-y-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
            {title && (
              <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
            )}

            {description && (
              <Description className="text-sm text-gray-500">
                {description}
              </Description>
            )}

            {children && (
              <div className="min-h-0 flex-1 overflow-y-auto text-gray-700">
                {children}
              </div>
            )}

            {actions && (
              <div className="flex justify-end gap-3 pt-2">
                {actions(close)}
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
export default Modal;
