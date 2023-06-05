import { Empty } from "antd"
import Avatar from 'react-hot-avatars'
import { FC, useState } from "react"

interface Chat {
    name: string | null,
    userId: string | null
    latestMessage?: string
    setChatHook?: React.Dispatch<React.SetStateAction<Chat>>
}


export const ChatUser: FC<Chat> = ({ name, userId, latestMessage, setChatHook }) => {
    return (

        <div key={''} className="py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer flex items-center gap-4" onClick={() => setChatHook!({ name, userId })}>
            <Avatar name={name as string} size="30" rounded />
            <div>
                <h6 className="font-[500]">{name as string}</h6>
                <p className="text-slate-700">{latestMessage}</p>
            </div>
        </div>
    )
}
const sampleChats: Chat[] = [
    {
        userId: '000000001',
        name: 'Yohana Doe',
        latestMessage: 'Hello! Good Afternoon sir!'
    },
    {
        userId: '000000002',
        name: 'Buchaman the great',
        latestMessage: 'They say, when it rains it pours'
    },
    {
        userId: '000000003',
        name: 'Kyle simpson',
        latestMessage: 'Thank you 👍'
    },
]

interface ChatMessageProps {
    message: string,
    sender: 'me' | 'others'
}

export const ChatMessage: FC<ChatMessageProps> = ({ message, sender }) => {
    return (
        <div className={`flex w-full my-2 ${sender == 'me' ? 'justify-end' : 'justify-start'}`}>
            <span
                className={`${sender == 'me' ? 'float-right text-white  bg-brand ' : 'float-left bg-slate-100 text-black'} max-w-1/2 w-fit py-3 px-4 rounded-full`}
            >
                {message}
            </span>
        </div>
    )
}
export default function Messages() {
    const [selectedChat, setSelectedChat] = useState<Chat>({ name: null, userId: null })
    const [, setMsg] = useState('')
    return (
        <div className="bg-white rounded-md p-10 grid grid-cols-2 w-full h-full">
            <div className="chats px-4  border-r relative h-full">
                <div className="mt-2">
                    {
                        sampleChats.map((chat, index) => (
                            <ChatUser key={index} userId={chat.userId} latestMessage={chat.latestMessage || 'Hey there!'} name={chat.name} setChatHook={setSelectedChat} />
                        ))
                    }
                </div>
                <button className="w-16 absolute h-16 text-white rounded-full text-4xl bg-brand bottom-0 right-6"><img src="/icons/addChat.svg" alt="" className="w-6 text-white fill-white h-6 mx-auto" /></button>
            </div>
            <div className="chats">
                {
                    selectedChat.userId != null ? (
                        <div className="px-6 relative h-full">
                            <div className="flex items-center gap-4  pb-4 border-b">
                                <button onClick={() => setSelectedChat({ userId: null, name: null })}><img src="/icons/close.svg" className="w-10 rounded-full h-10 p-2 hover:bg-slate-50" /></button>
                                <h1 className="text-lg font-[500]"> {selectedChat.name}</h1>
                            </div>
                            <div className=" p-2 relative">
                                <ChatMessage message="Hi 👋" sender="me" />
                                <ChatMessage message="Hello man 👋" sender="others" />
                                <ChatMessage message="I was requesting a night club session" sender="me" />
                                <ChatMessage message="No man, WTF 👽" sender="others" />
                            </div>
                            <div className=" flex items-center w-full p-2 rounded-full bg-gray-100 h-fit absolute bottom-0">
                                <input type="text" onChange={(e) => setMsg(e.target.value.trim())} placeholder="Type your text message here" className="py-3 p-6 bg-gray-100 w-full outline-none" />
                                <button className="bg-black  flex items-center font-[500]  text-white rounded-full px-4">Send&nbsp;&nbsp;<img src="/icons/send.svg" alt="" className="w-10 h-10 p-3  rounded-lg" /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center">
                            <Empty />
                            <h1 className="text-center text-slate-400">The chat you will select will appear here</h1>
                        </div>

                    )
                }
            </div>
        </div>
    )
}