import dontenv from 'dotenv'
dontenv.config();
import { get } from 'env-var';

export const PRODUCT_AMOUNT = get('PRODUCT_AMOUNT')

export const PRODUCT_TEST_AMOUNT = get('PRODUCT_TEST_AMOUNT')

export const PUBLIC_TEST_KEY = get('PUBLIC_TEST_KEY')

export const SECRET_TEST_KEY = get('SECRET_TEST_KEY')

export const PUBLIC_KEY = get('PUBLIC_KEY')

export const SECRET_KEY = get('SECRET_KEY')


