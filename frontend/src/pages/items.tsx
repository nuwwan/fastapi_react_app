import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TPlayer } from '../types';
import { createPlayer, getAllPlayers, removePlayer, updatePlayer } from '../services/api.s';
import CreatePlayer from './createPlayer';
import UpdatePlayerModal from './updatePlayer';


interface DataType {
    id: number;
    rank: string;
    name: string;
    points: number;
}

const PlayerDetailsTable = () => {
    const columns: TableProps<TPlayer>['columns'] = [
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
                    <Button icon={<EditOutlined />} size={size} onClick={() => handleUpdateBtn(record)} />
                    <Button icon={<DeleteOutlined />} size={size} danger onClick={() => handleRemoveBtn(record)} />
                </Space>
            ),
        },
    ];

    const [size, setSize] = useState<SizeType>("small");

    const [players, setPlayers] = useState<TPlayer[]>([])


    const [updatePlayerModalOpen, setUpdatePlayerModalOpen] = useState<boolean>(false)
    const [removePlayerModalOpen, setRemovePlayerOpen] = useState<boolean>(false)

    const [selectedPlayer, setSelectedPlayer] = useState<TPlayer | undefined>()

    useEffect(() => {
        // Get player data from the Backend at first loading
        getAllPlayers().then((res) => setPlayers(res.data))
    }, [])

    const handleCreatePlayer = (player: TPlayer) => {
        createPlayer(player).then((res) => setPlayers(res.data))
    }

    const handleRemoveBtn = (player: TPlayer) => {
        if (player.id) {
            setSelectedPlayer(player)
            setRemovePlayerOpen(true)
        }
    }

    const handleRemovePopupCancel = () => {
        setRemovePlayerOpen(false)
    }

    const handleRemovePlayer = () => {
        if (selectedPlayer?.id) {
            removePlayer(selectedPlayer.id).then((res) => {
                setPlayers(res.data)
                console.log('Successfully Removed')
            })
            setSelectedPlayer(undefined)
        }
        setRemovePlayerOpen(false)
    }

    const handleUpdateBtn = (player: TPlayer) => {
        if (player.id) {
            setSelectedPlayer(player)
            setUpdatePlayerModalOpen(true)
        }
    }

    const closeUpdateModal = () => {
        setUpdatePlayerModalOpen(false)
    }

    const handleUpdatePlayer = (name: string, points: number) => {
        if (selectedPlayer) {
            updatePlayer({ ...selectedPlayer, name: name, points: points }).then((res) => setPlayers(res.data))
            setSelectedPlayer(undefined)
        }

    }

    return (<div>
        <div><CreatePlayer onSubmit={handleCreatePlayer} /></div>
        <Modal title="Confirm Remove Player" open={removePlayerModalOpen} onOk={handleRemovePlayer} onCancel={handleRemovePopupCancel}></Modal>
        {!!selectedPlayer && <UpdatePlayerModal name={selectedPlayer.name} points={selectedPlayer.points} isOpen={updatePlayerModalOpen} closePopup={closeUpdateModal} onSubmit={handleUpdatePlayer} />}
        <div>
            <Table<TPlayer> columns={columns} dataSource={players} />
        </div>
    </div>)
}

export default PlayerDetailsTable