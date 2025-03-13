import React from "react";
export const ReorderIcon = ({ dragControls }: any) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onPointerDown={(event) => dragControls.start(event)}
      className="inline-block size-5 cursor-grab opacity-0 group-hover/row:opacity-100 transition-opacity"
    >
      <path
        d="M19.0736 9.66142C18.885 9.47285 18.6943 9.28499 18.505 9.09713C18.0965 8.69356 17.6736 8.2757 17.2693 7.85285C17.0715 7.64499 16.9222 7.55285 16.7865 7.55285C16.7865 7.55285 16.7843 7.55285 16.7829 7.55285C16.6479 7.55428 16.5029 7.64856 16.3122 7.85713C16.0729 8.11927 16.0743 8.30785 16.3172 8.55285C16.465 8.70213 16.6129 8.85213 16.7665 9.00856L17.165 9.41285H16.9493C16.6893 9.41285 16.4329 9.41427 16.1779 9.4157C15.5786 9.41927 15.0086 9.42213 14.4293 9.40713C14.1586 9.39927 13.9808 9.44142 13.8843 9.53999C13.7893 9.63785 13.75 9.80927 13.7636 10.08C13.7815 10.4386 13.9265 10.585 14.2643 10.585H17.02L17.0965 10.73L17.0472 10.7786C16.9872 10.8364 16.9286 10.8957 16.8693 10.955C16.74 11.0836 16.6065 11.2164 16.4672 11.3407C16.2679 11.5171 16.175 11.6628 16.1743 11.7978C16.1736 11.9328 16.2672 12.0828 16.47 12.2671C16.7522 12.525 16.9343 12.525 17.1915 12.2671C17.8186 11.6428 18.4443 11.0171 19.07 10.3921C19.3315 10.1307 19.3329 9.91927 19.0736 9.66142Z"
        fill="#8987A0"
      />
      <path
        d="M7.12647 9.41285H4.22504L4.62004 9.01499C4.79718 8.83713 4.96504 8.66927 5.12933 8.49785C5.30861 8.31142 5.31004 8.10356 5.13361 7.91285C5.04861 7.8207 4.9679 7.7407 4.88718 7.66785C4.79575 7.58499 4.69504 7.54356 4.59647 7.54356C4.50075 7.54356 4.40718 7.58356 4.32575 7.66356C3.64575 8.33285 2.94575 9.03142 2.24433 9.74285C2.08004 9.90999 2.0829 10.1357 2.25147 10.3178C2.31504 10.3871 2.38218 10.4521 2.44933 10.5186L3.00218 11.07C3.41647 11.4843 3.83147 11.8993 4.24718 12.3121C4.44718 12.51 4.66147 12.5114 4.87004 12.3171C4.94218 12.2486 5.01361 12.1786 5.08147 12.1057C5.27004 11.9043 5.26861 11.6936 5.07718 11.4957C4.9429 11.3578 4.80647 11.2214 4.66933 11.0857L4.45718 10.8736C4.43218 10.8493 4.4079 10.8228 4.37647 10.7893L4.18861 10.585H4.39575C4.66075 10.585 4.92218 10.5836 5.18075 10.5821C5.79361 10.5786 6.3729 10.5764 6.96147 10.5907C7.23504 10.5928 7.40933 10.5536 7.50861 10.4521C7.60647 10.3514 7.64647 10.1771 7.63147 9.91856C7.61147 9.55999 7.46504 9.41356 7.12647 9.41285Z"
        fill="#8987A0"
      />
      <path
        d="M10.9943 1.57856C10.7922 1.37856 10.5658 1.37856 10.3579 1.57927C10.2386 1.69499 10.1208 1.81356 10.0036 1.93142L9.36218 2.57285C9.03575 2.89785 8.71004 3.22356 8.38575 3.5507C8.18504 3.75356 8.18575 3.96142 8.38647 4.1707C8.45147 4.23856 8.51861 4.3057 8.58718 4.37142C8.78933 4.56499 9.01147 4.56427 9.21218 4.36927C9.3329 4.25213 9.45218 4.13213 9.57147 4.01213L10.1115 3.47356V4.57427C10.1115 5.20213 10.1115 5.8307 10.11 6.45856C10.11 6.64285 10.1536 6.75642 10.2479 6.81499C10.3436 6.87427 10.4793 6.91499 10.6308 6.92927C10.8822 6.95285 11.0543 6.91999 11.1522 6.82785C11.2536 6.73285 11.2979 6.55927 11.2908 6.2807C11.2765 5.69785 11.2793 5.12499 11.2829 4.51713C11.2843 4.25856 11.2858 3.99713 11.2858 3.73142V3.51427L11.6972 3.92499C11.8693 4.09856 12.0329 4.26213 12.1979 4.42285C12.3893 4.60785 12.6 4.60999 12.7958 4.42999C12.8729 4.35856 12.9465 4.28356 13.0186 4.20785C13.2079 4.0057 13.2072 3.78927 13.0165 3.59785C12.3443 2.92285 11.6715 2.24928 10.9943 1.57856Z"
        fill="#8987A0"
      />
      <path
        d="M12.9322 15.7043L12.8958 15.6678C12.7408 15.5114 12.6143 15.4386 12.5 15.4386C12.3865 15.4386 12.2608 15.51 12.1079 15.6636L11.2858 16.485V16.0593C11.2858 15.8271 11.2843 15.5957 11.2829 15.3636C11.2793 14.8321 11.2758 14.2828 11.2908 13.7414C11.2986 13.4578 11.2558 13.28 11.155 13.1814C11.0565 13.085 10.8858 13.0471 10.615 13.0614C10.2629 13.08 10.1122 13.2321 10.1122 13.57V16.505L9.90504 16.3143C9.86861 16.2807 9.84075 16.255 9.81433 16.2286C9.74004 16.155 9.66647 16.0807 9.59218 16.0057C9.46433 15.8764 9.33575 15.7478 9.20504 15.6214C9.11075 15.53 9.00575 15.4843 8.90075 15.4843C8.79504 15.4843 8.68933 15.5307 8.59218 15.6228C8.52004 15.6914 8.44933 15.7621 8.38004 15.8343C8.19361 16.0307 8.19075 16.2478 8.37147 16.4307C9.0379 17.1028 9.70718 17.7714 10.3808 18.4371C10.5629 18.6178 10.7979 18.6171 10.9786 18.4378C11.6679 17.7557 12.3522 17.0714 13.0343 16.3828C13.2043 16.2121 13.205 15.9978 13.0365 15.8093C13.0022 15.7728 12.9679 15.7386 12.9322 15.7043Z"
        fill="#8987A0"
      />
      <path
        d="M10.6922 11.2607C10.695 11.2607 10.6986 11.2607 10.7015 11.2607C11.3858 11.2607 11.95 10.7028 11.9615 10.0128C11.9672 9.68356 11.8393 9.36785 11.6015 9.12427C11.3608 8.87785 11.0422 8.73999 10.7043 8.73713C10.7015 8.73713 10.6979 8.73713 10.695 8.73713C10.3658 8.73713 10.0522 8.86856 9.81218 9.10785C9.56861 9.34999 9.43504 9.66713 9.43575 10.0007C9.43647 10.6907 10.0008 11.2557 10.6922 11.2607Z"
        fill="#8987A0"
      />
    </svg>
  );
};
