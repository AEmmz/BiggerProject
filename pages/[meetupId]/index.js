import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupById = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name={"description"}
          content={`Go to ${props.meetupData.title}`}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://aemmerling:Laangels27@cluster0.ls6ot.mongodb.net/NextJSTest"
  );
  const database = client.db();
  const nextJsCollection = database.collection("NextJSTest");
  const meetups = await nextJsCollection.find({}, { _id: 1 }).toArray();
  await client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://aemmerling:Laangels27@cluster0.ls6ot.mongodb.net/NextJSTest"
  );
  const database = client.db();
  const nextJsCollection = database.collection("NextJSTest");
  const singleMeetup = await nextJsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(singleMeetup);
  await client.close();

  return {
    props: {
      meetupData: {
        id: singleMeetup._id.toString(),
        title: singleMeetup.title,
        address: singleMeetup.address,
        description: singleMeetup.description,
        image: singleMeetup.image,
      },
    },
  };
};

export default MeetupById;
