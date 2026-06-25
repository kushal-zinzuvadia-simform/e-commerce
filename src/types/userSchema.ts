import { z } from 'zod';

import { INDIAN_STATES, type StateCode } from '../data/stateData';
import { patterns } from '../utils/Patterns';

export const GENDERS = ['Male', 'Female'] as const;

export const STATE_CODES = INDIAN_STATES.map(
  (state) => state.code
) as unknown as readonly [StateCode, ...StateCode[]];

const nameSchema = z
  .string()
  .min(2, {
    message: 'Name must contain at least 2 characters',
  })
  .max(20, {
    message: 'Name cannot exceed 20 characters',
  })
  .regex(patterns.name, {
    message: 'Name must contain only alphabets',
  });

const citySchema = z
  .string()
  .min(1, {
    message: 'City is required',
  })
  .max(30, {
    message: 'City cannot exceed 30 characters',
  })
  .regex(patterns.city, {
    message: 'Enter a valid city',
  });

export const registerSchema = z
  .object({
    firstName: nameSchema,

    lastName: nameSchema,

    gender: z.enum(GENDERS, {
      message: 'Please select a gender',
    }),

    dob: z
      .string()
      .min(1, {
        message: 'Date of birth is required',
      })
      .refine(
        (value) => {
          const date = new Date(value);

          return !isNaN(date.getTime());
        },
        {
          message: 'Enter a valid date of birth',
        }
      )
      .refine(
        (value) => {
          const dob = new Date(value);
          const today = new Date();

          dob.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);

          return dob < today;
        },
        {
          message: 'Date of birth must be in the past',
        }
      ),

    phone: z
      .string()
      .min(1, {
        message: 'Phone number is required',
      })
      .regex(patterns.phone, {
        message: 'Phone number must contain exactly 10 digits',
      }),

    email: z
      .string()
      .check(z.email({ message: 'Enter a valid email address' }))
      .max(254, { message: 'Email cannot exceed 254 characters' }),

    address: z
      .string()
      .min(5, {
        message: 'Address should be at least 5 characters long',
      })
      .max(100, {
        message: 'Address cannot exceed 100 characters',
      })
      .regex(patterns.address, {
        message: 'Enter a valid address',
      }),

    city: citySchema,

    stateCode: z.enum(STATE_CODES, {
      message: 'Please select a state',
    }),

    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100, {
        message: 'Password must not exceed 100 characters',
      })
      .regex(patterns.password, {
        message:
          'Password must contain letters, numbers and a special character',
      }),

    confirmPassword: z.string().min(1, {
      message: 'Please confirm your password',
    }),

    termsAccepted: z.literal(true, {
      message: 'You must accept the Privacy Policy and Terms & Conditions',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export type User = Omit<
  RegisterFormData,
  'confirmPassword' | 'termsAccepted'
> & {
  profileImage?: string;
};
