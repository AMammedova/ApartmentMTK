const useGetResponse = async (api: any, mutate: any, closeModal: any) => {
  try {
    const { statusCode, message } = await api;
    if (statusCode === 201) {
      closeModal();
      mutate();
      return message?.[0];
    } else if (statusCode === 200) {
      closeModal();
      mutate();
      return message?.[0];
    } else if (statusCode === 400) {
      return message?.[0];
    }
    else if (statusCode === 404) {
      return message?.[0];
    }
  } catch (error) {
    console.log(error);
    return "Server Error";
  }
};

export default useGetResponse;
