import { useLocation } from "@umijs/max"
import qs from 'qs'


const useQuery = <T = Record<string, string>>() => {
  const location = useLocation()
  const query = qs.parse(location.search.split('?')[1])


  return query as T
}
export default useQuery