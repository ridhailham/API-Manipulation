const UserModel = require('../models').user

async function index(req, res) {

    const { page, pageSize, name } = req.query

    try {

        const users = await UserModel.findAll({
            attributes: ["id", "name"],
            where: {
                name: name
            }
        })

        if(users.length === 0) {
            return res.status(404).json({
                status: 'failed',
                massage: 'data tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            massage: 'data berhasil ditemukan',
            jumlah: users.length,
            data: users
        })
    } catch (err) {
        console.log(err);
    }
}

async function detailedById(req, res) {
    const id = req.params.id

    try {
        const user = await UserModel.findByPk(id)

        if(user === null) {
            return res.status(404).json({
                status: 'failed',
                massage: 'data tidak ditemukan',
            })
        }

        return res.json({
            status: 'success',
            massage: 'user ditemukan',
            data: user
        })
    } catch (error) {
        
    }
}

async function detailedByEmail(req, res) {
    const email = req.params.email

    try {
        const user = await UserModel.findOne({
            where : {
                email: email
            }
        })

        if(user === null) {
            res.status(404).json({
                status: 'failed',
                massage: 'user tidak ditemukan' 
            })
        }

        return res.json({
            status: 'success',
            massage: 'user ditemukan',
            data: user
        })
    } catch (error) {
        
    }
}

async function update(req, res) {
    try {
        const payload = req.body
        const { id } = req.params
        const { name, email } = req.body

        const updateUser = await UserModel.update(payload, {
            where: {
                id: id
            }
        })

        // const updateUser = await UserModel.update({
        //     name: name,
        //     email: email
        // }, {
        //     where: {
        //         id: id
        //     }
        // })

        if(updateUser[0] === 0) {
            return res.status(404).json({
                status: 'failed',
                massage: 'data tidak ditemukan'
            })
        }

        console.log(updateUser);

        return res.json({
            status: 'success',
            massage: 'data berhasil diperbaharui'
        })
    } catch (err) {
        console.log(err);
    }
}

async function destroy(req, res) {
    const { id } = req.params

    const userDelete = await UserModel.destroy({
        where: {
            id: id
        }
    })

    if(userDelete === 0) {
        return res.json({
            status: 'failed',
            massage: 'user tidak ditemukan'
        })
    }

    return res.json({
        status: 'success',
        massage: 'user berhasil dihapus'
    })
}

async function multiDestroy(req, res) {
    const { id } = req.body

    const deleteUser = await UserModel.destroy({
        where: {
            id: id
        }
    })

    if(!deleteUser) {
        return res.json({
            status: 'failed',
            massage: 'user tidak ditemukan'
        })
    }

    return res.json({
        status: 'success',
        massage: 'user berhasil dihapus'
    })
}

module.exports = { index, detailedById, detailedByEmail, update, destroy, multiDestroy } 
