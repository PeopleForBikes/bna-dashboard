import * as z from 'zod';


const formSchema = z.object({
  country: z.string({
    required_error: 'Country is required by zod'
  }).min(3).max(20),
  city: z.string({
    required_error: 'City is required by zod'
  }),
  region: z.string({
    required_error: 'Region is required by zod'
  }),
  fips_code: z.string({
    required_error: 'FIPS Code is required by zod'
  })
}).strict();

type FormSchema = z.infer<typeof formSchema>;


export type { FormSchema };
export default formSchema;
