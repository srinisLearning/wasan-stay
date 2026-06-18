import React from "react";
import axios from "axios";
import SWAL from "sweetalert2";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const AdminAddRoomModal = ({ show, onClose }) => {
  // Zod schema for room
  const roomSchema = z.object({
    name: z.string().min(1, "Room name is required"),
    city: z.string().min(1, "City is required"),
    imageUrl: z.string().min(1, "Image URL is required"),
    phoneNumber: z.coerce
      .number()
      .min(1000000, "Phone number must be at least 7 digits"),
    email: z.string().email("Please enter a valid email address"),
    website: z.string().min(1, "Website is required"),
    contactPerson: z.string().min(1, "Contact person is required"),
    rentPerDay: z.coerce.number().min(0, "Rent per day must be >= 0"),
    singleStandardFactor: z.coerce.number().min(0, "Must be >= 0"),
    doubleStandardFactor: z.coerce.number().min(0, "Must be >= 0"),
    doublePremiumFactor: z.coerce.number().min(0, "Must be >= 0"),
    suiteFactor: z.coerce.number().min(0, "Must be >= 0"),
    additionalOccupancyFactor: z.coerce.number().min(0, "Must be >= 0"),
    checkOutTime: z.enum(["24 HRS", "12 NOON"]),
    description: z.string().min(1, "Description is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      city: "",
      imageUrl: "",
      phoneNumber: "",
      email: "",
      website: "",
      contactPerson: "",
      rentPerDay: 0,
      singleStandardFactor: 0,
      doubleStandardFactor: 0,
      doublePremiumFactor: 0,
      suiteFactor: 0,
      additionalOccupancyFactor: 0,
      checkOutTime: "24 HRS",
      description: "",
    },
  });

  //console.log(formData.checkOutTime);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/rooms/addRoom", data);
      SWAL.fire({
        title: "Room Added",
        text: "Room Added Successfully",
        icon: "success",
        timer: 2000,
      }).then(() => {
        document.location.reload();
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Add room error:", error);
      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        String(error);
      SWAL.fire({
        title: "Error",
        text: serverMessage,
        icon: "error",
      });
    }
  };

  if (!show) return null;

  const fieldClassStyle =
    "w-full  border border-1 border-primary p-1 mx-2 rounded-lg text-xs";
  const labelClassStyle = "text-xs text-primary-500 mx-2";
  //console.log("Editable", editable);

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-screen-xl">
          <h3 className="text-primary text-center font-bold text-xl my-2">
            ADD ROOM
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex  justify-between gap-6 items-center border-b-2 border-primary-200">
              <div className="flex flex-col gap-2">
                {" "}
                {/* Left side beginning */}
                <div>
                  <label htmlFor="name" className={labelClassStyle}>
                    Room Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Room Name"
                    className={fieldClassStyle}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="city" className={labelClassStyle}>
                    City
                  </label>
                  <input
                    type="text"
                    {...register("city")}
                    placeholder="City"
                    className={fieldClassStyle}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="imageUrl" className={labelClassStyle}>
                    Image URL
                  </label>

                  <input
                    type="text"
                    {...register("imageUrl")}
                    placeholder="Image URL"
                    className={fieldClassStyle}
                  />
                  {errors.imageUrl && (
                    <p className="text-xs text-red-600">
                      {errors.imageUrl.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phoneNumber" className={labelClassStyle}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="Phone Number"
                    className={fieldClassStyle}
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-600">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className={labelClassStyle}>
                    Email
                  </label>
                  <input
                    type="text"
                    {...register("email")}
                    placeholder="Email"
                    className={fieldClassStyle}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="website" className={labelClassStyle}>
                    Website
                  </label>
                  <input
                    type="text"
                    {...register("website")}
                    placeholder="Website"
                    className={fieldClassStyle}
                  />
                  {errors.website && (
                    <p className="text-xs text-red-600">
                      {errors.website.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contactPerson" className={labelClassStyle}>
                    Contact Person
                  </label>

                  <input
                    type="text"
                    {...register("contactPerson")}
                    placeholder="Contact Person"
                    className={fieldClassStyle}
                  />
                  {errors.contactPerson && (
                    <p className="text-xs text-red-600">
                      {errors.contactPerson.message}
                    </p>
                  )}
                </div>
              </div>{" "}
              {/* End of left side */}
              <div className="flex flex-col gap-2 items-start justify-start">
                {" "}
                {/* Right side */}
                <div>
                  <label htmlFor="rentPerDay" className={labelClassStyle}>
                    Rent Per Day [Basic Cost]
                  </label>
                  <input
                    type="number"
                    {...register("rentPerDay", { valueAsNumber: true })}
                    placeholder="Rent Per Day"
                    className={fieldClassStyle}
                  />
                  {errors.rentPerDay && (
                    <p className="text-xs text-red-600">
                      {errors.rentPerDay.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="singleStandardFactor"
                    className={labelClassStyle}
                  >
                    Single Standard Factor
                  </label>
                  <input
                    type="number"
                    {...register("singleStandardFactor", {
                      valueAsNumber: true,
                    })}
                    placeholder="Single Standard Factor"
                    className={fieldClassStyle}
                  />
                  {errors.singleStandardFactor && (
                    <p className="text-xs text-red-600">
                      {errors.singleStandardFactor.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="doubleStandardFactor"
                    className={labelClassStyle}
                  >
                    Double Standard Factor
                  </label>

                  <input
                    type="number"
                    {...register("doubleStandardFactor", {
                      valueAsNumber: true,
                    })}
                    placeholder="Double Standard Factor"
                    className={fieldClassStyle}
                  />
                  {errors.doubleStandardFactor && (
                    <p className="text-xs text-red-600">
                      {errors.doubleStandardFactor.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="doublePremiumFactor"
                    className={labelClassStyle}
                  >
                    Double Premium Factor
                  </label>
                  <input
                    type="number"
                    {...register("doublePremiumFactor", {
                      valueAsNumber: true,
                    })}
                    placeholder="Double Premium Factor"
                    className={fieldClassStyle}
                  />
                  {errors.doublePremiumFactor && (
                    <p className="text-xs text-red-600">
                      {errors.doublePremiumFactor.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="suiteFactor" className={labelClassStyle}>
                    Suite Factor
                  </label>
                  <input
                    type="number"
                    {...register("suiteFactor", { valueAsNumber: true })}
                    placeholder="Suite Factor"
                    className={fieldClassStyle}
                  />
                  {errors.suiteFactor && (
                    <p className="text-xs text-red-600">
                      {errors.suiteFactor.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="additionalOccupancyFactor"
                    className={labelClassStyle}
                  >
                    Additional Occupancy Factor
                  </label>
                  <input
                    type="number"
                    max={1}
                    min={0}
                    step="0.01"
                    {...register("additionalOccupancyFactor", {
                      valueAsNumber: true,
                    })}
                    placeholder="Additional Occupancy Factor"
                    className={fieldClassStyle}
                  />
                  {errors.additionalOccupancyFactor && (
                    <p className="text-xs text-red-600">
                      {errors.additionalOccupancyFactor.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="checkOutTime" className={labelClassStyle}>
                    Check Out Time
                  </label>

                  <select
                    className=" border border-primary max-w-60 mx-1 py-1 text-xs"
                    {...register("checkOutTime")}
                    id="checkOutTime"
                  >
                    <option value="24 HRS">24 HRS</option>
                    <option value="12 NOON">12 NOON</option>
                  </select>
                  {errors.checkOutTime && (
                    <p className="text-xs text-red-600">
                      {errors.checkOutTime.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="m-2">
              <label htmlFor="description" className={labelClassStyle}>
                Description
              </label>
              <textarea
                type="textarea"
                {...register("description")}
                placeholder="Description"
                className={fieldClassStyle}
                rows="4"
                cols="50"
              ></textarea>
              {errors.description && (
                <p className="text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex m-2 justify-end items-center gap-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                ADD ROOM
              </button>
            </div>
          </form>
          <div className="flex m-2 justify-end items-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAddRoomModal;
