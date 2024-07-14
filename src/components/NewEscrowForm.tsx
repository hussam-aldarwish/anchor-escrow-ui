'use client';
import useEscrowProgram from '@/hooks/useEscrowProgram';
import { alertService } from '@/services/alertService';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

export const escrowSchema = yup.object({
  mint_a: yup
    .string()
    .max(44, 'Mint address must be no more than 44 characters long')
    .matches(/^[A-Za-z0-9]+$/, 'Mint address must be alphanumeric')
    .required('Required'),
  mint_b: yup
    .string()
    .max(44, 'Mint address must be no more than 44 characters long')
    .matches(/^[A-Za-z0-9]+$/, 'Mint address must be alphanumeric')
    .required('Required'),
  deposit: yup
    .number()
    .positive('Must be a positive number')
    .required('Required'),
  receive: yup
    .number()
    .positive('Must be a positive number')
    .required('Required'),
});

function NewEscrowForm() {
  const { makeEscrow } = useEscrowProgram();

  const formik = useFormik({
    initialValues: {
      mint_a: '',
      mint_b: '',
      deposit: 0,
      receive: 0,
    },
    validationSchema: escrowSchema,
    onSubmit: async (values) => {
      // set all fields to read only while the transaction is being processed
      formik.setSubmitting(true);
      try {
        await makeEscrow(values);
        alertService.sendAlert('Escrow created successfully', 'success');
        formik.resetForm();
      } catch (err) {
        alertService.sendAlert('Error creating escrow', 'error');
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Make a new escrow
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="mint_a"
              className="block text-sm font-medium text-gray-700"
            >
              Your token mint
            </label>
            <input
              id="mint_a"
              name="mint_a"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mint_a}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                formik.touched.mint_a && formik.errors.mint_a
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.mint_a && formik.errors.mint_a ? (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.mint_a}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="deposit"
              className="block text-sm font-medium text-gray-700"
            >
              Your token mint amount
            </label>
            <input
              id="deposit"
              name="deposit"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deposit}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                formik.touched.deposit && formik.errors.deposit
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.deposit && formik.errors.deposit ? (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.deposit}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="mint_b"
              className="block text-sm font-medium text-gray-700"
            >
              Counterparty token mint
            </label>
            <input
              id="mint_b"
              name="mint_b"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mint_b}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                formik.touched.mint_b && formik.errors.mint_b
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.mint_b && formik.errors.mint_b ? (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.mint_b}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="receive"
              className="block text-sm font-medium text-gray-700"
            >
              Counterparty token mint amount
            </label>
            <input
              id="receive"
              name="receive"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.receive}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                formik.touched.receive && formik.errors.receive
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.receive && formik.errors.receive ? (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.receive}
              </div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary">
              {formik.isSubmitting ? 'Creating escrow...' : 'Create escrow'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewEscrowForm;
