import React, { useEffect, useState } from "react";
import OtpModal from "../components/Modals/OtpModal";
import loginFrame from "../assets/login-frame.png";
import useSWRMutation from "swr/mutation";
import { LoginApi } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
  };

  let [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = (): void => {
    setIsOpen(false);
  };
  const openModal = (): void => {
    setIsOpen(true);
  };

  const [isLogged, setLogged] = useState(false);

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/AccountAdmin/LoginAdmin",
    LoginApi.user
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger({ username, password });
  };

  useEffect(() => {
     if (data?.statusCode === 202) {
      openModal();
    
      alert (data?.message?.[0]);
    } else if (data?.statusCode === 200) {
      openModal();
      
      alert(data?.message?.[0]);
    } else if (data?.statusCode === 400) {
      alert(data?.message?.[0]);
    }
    else if (data?.statusCode === 404) {
   alert(data?.message?.[0]);
    
    }
  }, [data]);

  return (
    <div className="relative flex min-h-screen">
      <div className="relative items-center justify-center hidden w-full max-w-4xl xl:flex ">
        <div className="relative z-10 flex items-center justify-center ">
          <svg
            width="224"
            height="224"
            viewBox="0 0 224 224"
            fill="none"
            className="absolute mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="112"
              cy="112"
              r="112"
              fill="url(#paint0_linear_387_3759)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_387_3759"
                x1="112"
                y1="-81"
                x2="101"
                y2="347"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#514EF3" />
                <stop offset="0.316407" stop-color="#514EF3" />
                <stop offset="0.536848" stop-color="#1A1C1E" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <h1 className="pt-14 relative z-10 text-white text-[64px] text-center font-bold">
            Yaşayış kompleksi İdarəetmə sistemi
          </h1>
        </div>

        <svg
          className="absolute top-0 left-0 overflow-hidden"
          viewBox="0 0 926 910"
          width="926"
          height="910"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="img1"
              patternUnits="userSpaceOnUse"
              width="1000"
              height="1000"
            >
              <image href={loginFrame} className="object-cover w-full " />
            </pattern>
          </defs>
          <path
            fill="url(#img1)"
            d="M926 -6C926 -6 838 156 772 302C706 448 860 466 874 574C888 682 720 714 758 874C789.667 1007.33 849.111 1022.61 868.046 1024H874C874 1024 871.833 1024.28 868.046 1024H-68L-46 -100L926 -6Z"
          />
        </svg>

        <svg
          width="184"
          height="296"
          viewBox="0 0 184 296"
          className="absolute bottom-0 left-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M183.5 390.5C183.5 530.206 64.6545 643.5 -82 643.5C-228.655 643.5 -347.5 530.206 -347.5 390.5C-347.5 250.794 -228.655 137.5 -82 137.5C64.6545 137.5 183.5 250.794 183.5 390.5Z"
            stroke="#FCFCFC"
          />
          <path
            d="M183.5 253.5C183.5 393.206 64.6545 506.5 -82 506.5C-228.655 506.5 -347.5 393.206 -347.5 253.5C-347.5 113.794 -228.655 0.5 -82 0.5C64.6545 0.5 183.5 113.794 183.5 253.5Z"
            stroke="#FCFCFC"
          />
        </svg>
      </div>
      {/* <img
          className="absolute top-0 w-[1062px] object-cover h-[828px] aspect-video"
          src={loginFrame}
          alt="loginFrame"
        /> */}
      <div className="flex justify-center w-full h-full pt-[158px]">
        <svg
          width="236"
          height="122"
          viewBox="0 0 236 122"
          className="absolute bottom-0 right-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="193" cy="236" r="193" fill="#514EF3" />
          <circle
            cx="199.5"
            cy="223.5"
            r="195.5"
            stroke="#514EF3"
            stroke-width="2"
          />
          <circle
            cx="199.5"
            cy="208.5"
            r="195.75"
            stroke="#514EF3"
            stroke-width="1.5"
          />
          <circle cx="196.5" cy="196.5" r="196" stroke="#514EF3" />
        </svg>
        <div className="relative pl-20">
          <h2 className=" font-bold text-center text-[#1e1e1e] text-[52px]">
            Xoş gəlmisiniz
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mt-24">
              <div className="flex flex-col space-y-1.5">
                <label>Login</label>
                <input
                  onChange={handleUsername}
                  className="px-5 py-3.5 placeholder:text-[#5b5b5b] border rounded-lg"
                  placeholder="Giriş üçün login daxil edin"
                  type="text"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5 mt-5">
                <label>Şifrə</label>
                <input
                  onChange={handlePassword}
                  className="px-5 py-3.5 placeholder:text-[#5b5b5b] border rounded-lg"
                  placeholder="Şifrəni daxil edin"
                  type="text"
                  required
                />
              </div>

              <div className="flex justify-between px-1 mt-3">
                <label className="flex gap-1.5 text-xs font-medium">
                  {" "}
                  <input type="checkbox" className="rounded" />
                  Məni xatırla
                </label>
                <span className="inline-flex text-xs font-medium ">
                  Şifrəni unutmuşam
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 rounded-lg text-[#FCFCFC] font-semibold text-sm py-3.5 mt-16"
                disabled={isMutating}
              >
                Daxil ol
              </button>
            </div>
          </form>
        </div>
      </div>
      <OtpModal isOpen={isOpen} closeModal={closeModal} username={username} />
    </div>
  );
};

export default Login;
