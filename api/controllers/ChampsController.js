/**
 * ChampController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    get: function(req, res){
        Champ.find()
            .then(function(champs){
                if(!champs || champs.length === 0){
                    return res.send({
                        'success': false,
                        'message': 'No records found'
                    });
                }
                return res.send({
                    'success': true,
                    'message': 'Records fetched',
                    'data': champs
                });
            })
            .catch(function(err){
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Unable to fetch records'
                });
            });
    },
    create: async function(req, res){
        try {
            const createdChamp = await Champ.create(req.allParams()).fetch();
            return res.send({
                'success': true,
                'message': 'Champ created successfuly',
                'data': createdChamp
            });
        } catch (error) {
            sails.log.debug(error);
            return res.send({
                'success': false,
                'message': 'Unable to create champ'
            });
        }
    },
    update: async (req, res) => {
        try {
            const updatedChamp = await Champ.update(req.param('id'), req.allParams()).fetch();
            return res.send({
                'success': true,
                'message': 'Record updated',
                'data': updatedChamp
            });
        } catch (error) {
            sails.log.debug(error);
            return res.send({
                'success':false,
                'message':`Unable to update record with id: ${ req.param(id) }`
            });
        }
    },
    delete: async(req, res) => {
        try {
            const deletedChamp = await Champ.destroy(req.param('id')).fetch();
            if(deletedChamp.length === 0){
                throw new Error('Champ doesn\'t exists');
            }
            return res.send({
                'success':true,
                'message':'Champ deleted successfuly',
                'data': deletedChamp
            });
        } catch (error) {
            sails.log.debug(error);
            return res.send({
                'success': false,
                'message': `Unable to delete Champ with id: ${ req.param('id') }`
            });
        }
    }
};

