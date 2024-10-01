import { redirect } from 'next/navigation'
import { getSelectedLanguage } from './_actions/getSelectedLanguage';

export default async function Home() {
  const language = await getSelectedLanguage();

  console.log({language});
  
  redirect(`/${language["language"]}`)
}
