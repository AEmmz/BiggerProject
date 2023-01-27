import React, { Fragment, useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name={"description"} content={"Meet Some Friends"} />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://aemmerling:Laangels27@cluster0.ls6ot.mongodb.net/NextJSTest"
  );
  const database = client.db();
  const nextJsCollection = database.collection("NextJSTest");

  const meetups = await nextJsCollection.find().toArray();
  await client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//
//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// };

export default HomePage;
