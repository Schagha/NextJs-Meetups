// our-domain.com/new-meetup
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    try{
      const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify(enteredMeetupData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
      throw new Error('Failed to add meetup');
      }

      const data = await response.json();

      console.log(response);

      router.push('/');
    } catch(error) {
      console.error(error);
    }    
  }

  return (<Fragment>
    <Head>
      <title>Add a New Meetups</title>
      <meta name='description' content='Add your own meetups and create amazing networking opportunities!' />
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  )
}

export default NewMeetupPage;