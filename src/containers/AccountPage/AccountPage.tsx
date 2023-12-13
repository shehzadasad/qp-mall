import Label from "components/Label/Label";
import React, { useEffect, FC, useState, useRef } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { avatarImgs } from "contains/fakeData";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomerData } from "redux/ProfilePage/CustomerApi";
import { postCustomerData } from "redux/ProfilePage/postCustomerApi";
import { postprofilePictureData } from "redux/ProfilePage/ProfilePhoto/ProfilePhotoApi";
import { Formik } from "formik";
import * as Yup from "yup";
import CheckingProfile from "./checkingprofile";
import LocalError from "./LocalError";
const validationSearch = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .matches(/^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/, "Invalid name format"),

  email: Yup.string().email("invalid email").required("Required"),
  billingAddress: Yup.string().required("Required"),
  shippingAddress: Yup.string().required("Required"),
  phoneNumber: Yup.number().required("Required"),
  dateOfBirth: Yup.date()
    .nullable()
    .required("Date of birth is required")
    .test("valid-date", "Invalid date", function (value) {
      if (!value) return false;
      const date = new Date(value);
      const isValidDate = !isNaN(date.getTime());
      return isValidDate;
    })
    .test(
      "future-date",
      "Date of birth can't be in the future",
      function (value) {
        if (!value) return false;
        const date = new Date(value);
        const isFutureDate = date > new Date();
        return !isFutureDate;
      }
    )
    .test("non-zero-date", "Invalid date", function (value) {
      if (!value) return false;
      const year = new Date(value).getFullYear();
      const month = new Date(value).getMonth() + 1;
      const day = new Date(value).getDate();
      return !(year === 0 || month === 0 || day === 0);
    }),
});
export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const dispatch = useDispatch();

  const [filebase64, setFileBase64] = useState<string>("");
  const [S3url, setS3url] = useState<any>([]);
  const customerData = useSelector((state: any) => state.Customer);
  const loginLoader = useSelector((state: any) => state.token.loginLoader);
  const loginToken = useSelector((state: any) => state.token.loginToken);

  useEffect(() => {
    dispatch(fetchCustomerData({ loginToken: loginToken }));
  }, [dispatch, loginLoader]);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (event: any) => {
    if (inputRef.current) {
      inputRef.current.click();
    }

    let files = event.target.files;

    if (files) {
      const fileRef = files[0] || "";
      const fileType: string = fileRef.type || "";

      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`);
      };
    }
  };

  return (
    <>
      {customerData ? (
        <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: customerData ? customerData?.customerData?.name : "",
              email: customerData ? customerData?.customerData?.email : "",
              dateOfBirth: customerData
                ? customerData?.customerData?.date_of_birth_string
                : "",
              billingAddress: customerData
                ? customerData?.customerData?.billing_address
                : "",
              shippingAddress: customerData
                ? customerData?.customerData?.shipping_address
                : "",
              phoneNumber: customerData
                ? customerData?.customerData?.phone_number
                : "",
              gender: customerData ? customerData?.customerData?.gender : "",
            }}
            validationSchema={validationSearch}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const payload = {
                name: values.name,
                phone_number: values.phoneNumber,
                gender: values.gender,
                date_of_birth: values.dateOfBirth.toString(),
                email: values.email,
                shipping_address: values.shippingAddress,
                billing_address: values.billingAddress,
              };

              setSubmitting(true);
              // resetForm();
              setSubmitting(false);

              dispatch(
                postCustomerData({ payload: payload, loginToken: loginToken })
              );

              // dispatch(
              //   postprofilePictureData({
              //     payload: filebase64,
              //     loginToken: loginToken,
              //   })
              // );
            }}
          >
            {({
              values,
              errors,
              touched: any,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <CommonLayout>
                  <div className="space-y-10 sm:space-y-12">
                    {/* HEADING */}
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                      Account information
                    </h2>

                    <div className="flex flex-col md:flex-row">
                      <div className="flex-grow mt-2md:mt-0 md:pl-16 max-w-3xl space-y-6">
                        <div>
                          <Label>Full name</Label>
                          <Input
                            className="mt-1.5 focus:ring-primary-500"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name || "" || ""}
                            required // add required attribute
                          />

                          <LocalError error={errors.name} />
                        </div>

                        {/* ---- */}

                        {/* ---- */}
                        <div>
                          <Label>Email</Label>
                          <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                              <i className="text-2xl las la-envelope"></i>
                            </span>
                            <Input
                              name="email"
                              id="email"
                              className="!rounded-l-none focus:ring-primary-500"
                              value={values.email || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <LocalError error={errors.email} />
                        </div>

                        {/* ---- */}
                        <div className="max-w-lg">
                          <Label>Date of birth</Label>
                          <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                              <i className="text-2xl las la-calendar"></i>
                            </span>
                            <Input
                              className="!rounded-l-none focus:ring-primary-500"
                              type="date"
                              name="dateOfBirth"
                              id="dateOfBirth"
                              value={values.dateOfBirth || ""}
                              onChange={handleChange}
                              min="1930-01-01"
                              max={new Date().toISOString().split("T")[0]}
                              placeholder="Select a date"
                            />
                          </div>
                          <LocalError error={errors.dateOfBirth} />
                        </div>
                        {/* ---- */}
                        <div>
                          <Label>Billing Address</Label>
                          <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                              <i className="text-2xl las la-map-signs"></i>
                            </span>
                            <Input
                              name="billingAddress"
                              className="!rounded-l-none focus:ring-primary-500"
                              id="billingAddress"
                              value={values.billingAddress || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <LocalError error={errors.billingAddress} />
                        </div>
                        {/* ---- */}
                        <div>
                          <Label>Shipping Address</Label>
                          <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                              <i className="text-2xl las la-map-signs"></i>
                            </span>
                            <Input
                              className="!rounded-l-none focus:ring-primary-500"
                              name="shippingAddress"
                              id="shippingAddress"
                              value={values.shippingAddress || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <LocalError error={errors.shippingAddress} />
                        </div>

                        {/* ---- */}
                        <div>
                          <Label>Gender</Label>
                          <Select
                            className="mt-1.5"
                            name="gender"
                            value={values.gender || ""}
                            onChange={handleChange}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Select>
                        </div>

                        {/* ---- */}
                        <div>
                          <Label>Phone number</Label>
                          <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                              <i className="text-2xl las la-phone-volume"></i>
                            </span>
                            <Input
                              className="!rounded-l-none focus:ring-primary-500"
                              name="phoneNumber"
                              id="phoneNumber"
                              value={values.phoneNumber || ""}
                              onChange={handleChange}
                              disabled={true}
                            />
                          </div>
                          <LocalError error={errors.phoneNumber} />
                        </div>

                        <div className="pt-2">
                          <ButtonPrimary
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Update account
                          </ButtonPrimary>
                        </div>
                      </div>
                    </div>
                  </div>
                </CommonLayout>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
};

export default AccountPage;
