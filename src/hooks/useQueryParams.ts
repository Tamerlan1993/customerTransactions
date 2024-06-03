import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

export default (): [Record<string, string>, (values: Record<string, unknown>) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentParams = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);

    return [
        currentParams,
        (values) => {
            const query = Object.fromEntries(
                Object.entries({
                    ...currentParams,
                    ...values,
                })
                    .filter(([, value]) => value != null && value != undefined && value != '')
                    .map((item) => {
                        const [key, value] = item;

                        const trimmedValue = typeof value === 'string' ? value?.trim() : value;
                        item = [key, trimmedValue];
                        return item;
                    }),
            );
            setSearchParams(query as URLSearchParamsInit);
        },
    ];
};
