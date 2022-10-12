
exports.index = (req,res)=>{
    res.send('Send All Connections');
};

exports.new = (req,res)=>{
    res.send('Send New Connections Form');
};

exports.create = (req,res)=>{
    res.send('Created A New Connection');
};

exports.show = (req,res)=>{
    res.send('Send Connection With ID ' + req.params.id);
};

exports.edit = (req,res)=>{
    res.send('Send The Edit Form ');
};

exports.update = (req,res)=>{
    res.send('Update Story With Id ' + req.params.id);
};

exports.delete = (req,res)=>{
    res.send('Delete Story With Id ' + req.params.id);
};