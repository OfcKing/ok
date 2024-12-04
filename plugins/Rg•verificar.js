let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender];

  if (user.registered) return m.reply('✐ Ya estás registrado.');

  if (args.length < 2) return m.reply('✐ Por favor, proporciona tu nombre y edad.\nEjemplo: #reg Juan 25');

  let [name, age] = args;
  age = parseInt(age);
  if (isNaN(age)) return m.reply('✐ La edad debe ser un número válido.');

  user.name = name;
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;

  m.reply(`✐ Registro exitoso.\n\nNombre: ${name}\nEdad: ${age}`);
};

handler.help = ['reg'];
handler.tags = ['rg'];
handler.command = ['reg', 'register'];

export default handler;