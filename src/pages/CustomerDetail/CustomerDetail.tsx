import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const CustomerDetail = (props: Props) => {
  return (
    <React.Fragment>
          <div className="w-1/2 h-[200px] rounded-2xl bg-cover bg-center flex items-end p-5" style={{backgroundImage:"url(/Cover.svg"}}>
            <div className="w-[80px] h-[80px] rounded-full bg-white flex items-end justify-end">
              <img src="/icons/editicon.svg" alt="" className='bg-primary rounded-full w-[24px] h-[24px] p-1 cursor-pointer'/>
            </div>
          </div>
          <form action="">
                    <div className=" w-1/2 flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          Ad
                        </label>
                        <input
                          type="text"
                          className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          Soyad
                        </label>
                        <input
                          type="text"
                          className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                          required
                        />
                      </div>
                    </div>

                    <div className=" w-1/2 flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          E-poçt
                        </label>
                        <input
                          type="email"
                          className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          Nömrə
                        </label>
                        <input
                          type="number"
                          className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                          required
                        />
                      </div>
                    </div>
                    <div className=" w-1/2 flex items-start flex-col justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                      <label
                        htmlFor="solution"
                        className="inline-flex  justify-star items-center  w-full"
                      >
                        Nəqliyyat
                      </label>
                      <div className="flex flex-row justify-between items-center">
                        <input
                          type="text"
                          placeholder="10 - AA - 000"
                          className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-sm placeholder-gray-400"
                          required
                        />
                       
                      </div>
                
                     

                    </div>

                   
                  </form>
          

    </React.Fragment>

  )
}

 


export default CustomerDetail;
