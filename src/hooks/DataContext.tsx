// import { createContext, useEffect, useState, type ReactNode } from "react";

// const DataContext = createContext();

// export const DataProvider = ({ children }: { children: ReactNode }) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/data.json");
//         const dataResponse = await res.json();
//         return setData(dataResponse);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, [data]);
//   return { children };
// };
