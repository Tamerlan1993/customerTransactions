import * as yup from 'yup';
import { requiredMessage } from '../../constants';

const phoneRegExp = /[+994](?:10|51|50)([2-9][0-9]{2})([0-9]{2})([0-9]{2})/;

export const createCustomerSchema = yup.object({
    Name: yup.string().nullable().required(requiredMessage),
    Surname: yup.string().nullable().required(requiredMessage),
    GSMNumber: yup.string().nullable().required(requiredMessage).matches(phoneRegExp, 'GSM Number is not valid'),
    BirthDate: yup.string().nullable().required(requiredMessage).test({
        message: "Not correct birth date",
        test: date => new Date(date) <= new Date()
    }),
})
export type CreateCustomerForm = yup.InferType<typeof createCustomerSchema>

export const customerFilterSchema = yup.object({
    CustomerID: yup.string().nullable(),
    Name: yup.string().nullable(),
    Surname: yup.string().nullable(),
    GSMNumber: yup.string().nullable()
        .notRequired().matches(phoneRegExp, {
            excludeEmptyString: true,
            message: 'GSM Number is not valid'
        },),
})

export type CustomerFilterForm = yup.InferType<typeof customerFilterSchema>

export const addCardNumberSchema = yup.object({
    CardNumber: yup.string().nullable().required(requiredMessage)
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(16, 'Must be exactly 16 digits')
        .max(16, 'Must be exactly 16 digits'),
})

export type AddCardNumberSchemaForm = yup.InferType<typeof addCardNumberSchema>
