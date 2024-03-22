import { useRouter } from "next/router";

const SearchSSRData = async () => {
    const router = useRouter();
    const { query } = router;
    return query;
  }
  
  export default SearchSSRData;