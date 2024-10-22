import Welcome from '@/components/Welcome';
import { getSession } from '@/utils/session';


export default async function Home() {
  const session = await getSession()

  return (
    <Welcome />
  )
}
