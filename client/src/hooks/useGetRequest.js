export const useGetRequest = (url, method, title, updateTodoList) => {
  const fetchData = async (url, method, title, updateTodoList) => {
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });

      if (res.status !== 200) {
        const json = await res.json();
        alert(json.message);
        return;
      }
      updateTodoList();
    } catch (e) {
      console.log(e);
    }
  };

  return { fetchData };
};
