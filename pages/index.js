import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='Brows a huge list of highly active React meetups!' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect('mongodb+srv://shagha-sh:shagha@cluster0.zygvozb.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray()

    client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  }
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage;
