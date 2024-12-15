import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


interface DataType {
    id: number;
    rank: string;
    name: string;
    points: number;
}

const data: DataType[] = [
    {
        id: 1,
        rank: 'T1',
        name: 'John',
        points: 100,
    },
    {
        id: 2,
        rank: 'T2',
        name: 'Jack',
        points: 100,
    },
    {
        id: 3,
        rank: '2',
        name: 'Sam',
        points: 200,
    },
];

const Items = () => {
    const [size, setSize] = useState<SizeType>("small");

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} size={size} />
                    <Button icon={<DeleteOutlined />} size={size} danger/>
                </Space>
            ),
        },
    ];
    return (<Table<DataType> columns={columns} dataSource={data} />)
}

export default Items