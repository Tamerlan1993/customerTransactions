import { ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { Input, InputProps } from 'reactstrap';

interface IProps<T extends FieldValues> extends UseControllerProps<T> {
  inputProps?: InputProps;
  label?: ReactNode;
  onChange?: (value?: string) => void;
}

const FormField = <T extends FieldValues>({
  control,
  name,
  inputProps,
  label,
  onChange,
}: IProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <div className='d-flex flex-column gap-2'>
            {label}
            <Input
              {...field}
              {...inputProps}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e.target.value);
              }}
            />
            {fieldState?.error?.message && (
              <span className='text-danger'>{fieldState?.error?.message}</span>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormField;
