import { Collapse } from 'antd'


var data: { title: string, data: string }[] = new Array(5).fill({
    title: `Lorem ipsum dolor sit amet`,
    data: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reiciendis eius laborum neque veniam, harum, possimus expedita iste dolorum saepe dicta architecto minima totam enim modi. Perspiciatis laboriosam inventore voluptate?
    Ipsum animi, iusto repellat ullam assumenda ducimus! Consectetur natus nulla quo accusamus. Tempore dolores ea earum. Quod odit quam, temporibus ipsum ratione tempore dicta, harum eum sit id eveniet mollitia!
    Repellendus est, et illo quo rem dolorem facere consequuntur rerum doloribus totam quibusdam perferendis amet, ut impedit doloremque. Sit aliquid natus eligendi ipsum aperiam quibusdam suscipit tenetur, pariatur illo laboriosam?`
})
export default function Announcements() {
    return (
        <div className='bg-white p-10 rounded-md'>
            <h1 className='font-bold mb-4'>Announcements</h1>
            <Collapse >
                {
                    data.map((data, index) => (
                        <Collapse.Panel header={data.title} key={index}>
                            <p>{data.data}</p>
                        </Collapse.Panel>
                    ))
                }
            </Collapse>
        </div>
    )
}