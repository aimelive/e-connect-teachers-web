import { FC, useState } from "react"

interface EventProps {
    title: string
    desc: string
    date: string
    time: string
    location: string
    image: string
}

const Event: FC<EventProps> = ({ title, desc, date, time, location,  }) => {
    const [showMore, setShowMore] = useState(true)
    return (
        <div className="bg-brand/5  w-full  rounded-xl overflow-hidden pt-14">
            {/* <img src={image} className="min-w-[300px] w-full object-cover h-20 max-w-sm"  draggable={false} /> */}
            <div className="p-4">
                <p className="font-bold text-brand text-lg">{title}</p>
                <p className="font-medium mb-1">{location}</p>
                <p className="text-slate-600 cursor-pointer mb-2" onClick={() => setShowMore(!showMore)}>{showMore ? desc : desc.slice(0, 30).toString().concat('...')}</p>
                <p className="font-bold text-slate-700 "> {date} - {time}</p>
            </div>
        </div>
    )   
}


const data: EventProps[] = [
    {
        title: "End term party",
        desc: "The quick brown fox jumps over the lazy dog ",
        date: "12-12-2022",
        time: "10 : 00 PM",
        location: 'School main hall',
        image: 'https://picsum.photos/seed/picsum/536/354'
    },
    {
        title: "End term party",
        desc: "The quick brown fox jumps over the lazy dog ",
        date: "12-12-2022",
        time: "10 : 00 PM",
        location: 'School main hall',
        image: 'https://picsum.photos/seed/picsum/536/354'
    },
    {
        title: "End term party",
        desc: "The quick brown fox jumps over the lazy dog ",
        date: "12-12-2022",
        time: "10 : 00 PM",
        location: 'School main hall',
        image: 'https://picsum.photos/seed/picsum/536/354'
    },
    {
        title: "End term party",
        desc: "The quick brown fox jumps over the lazy dog ",
        date: "12-12-2022",
        time: "10 : 00 PM",
        location: 'School main hall',
        image: 'https://picsum.photos/seed/picsum/536/354'
    },
    {
        title: "End term party",
        desc: "The quick brown fox jumps over the lazy dog ",
        date: "12-12-2022",
        time: "10 : 00 PM",
        location: 'School main hall',
        image: 'https://picsum.photos/seed/picsum/536/354'
    },
    {
        title: "End term party",
        desc: "The quick brown fox jumps over the lazy dog ",
        date: "12-12-2022",
        time: "10 : 00 PM",
        location: 'School main hall',
        image: 'https://picsum.photos/seed/picsum/536/354'
    },
    {
        title: "End term party",
        desc: "The quick brown fox jumps over the lazy dog ",
        date: "12-12-2022",
        time: "10 : 00 PM",
        location: 'School main hall',
        image: 'https://picsum.photos/seed/picsum/536/354'
    },
]

export default function Events() {
    return (
        <div className="bg-white  p-10 h-full rounded-md">
            <h1 className=" font-bold my-4">Events</h1>
            <div className="grid grid-cols-3 gap-4 align-middle">
                {data.map((event, i) => <Event key={i} {...event} />)}
            </div>
        </div>
    )
}