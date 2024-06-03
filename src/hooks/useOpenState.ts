import { useState } from 'react';

export default (isOpenDefault = false) => {
    const [isOpen, setOpen] = useState(isOpenDefault);

    return {
        isOpen,
        open: () => setOpen(true),
        close: () => setOpen(false),
        toggle: () => setOpen((open) => !open),
    };
};