export async function GET() {
  try {
    // Lista local de motoristas para testar sem base de dados externa
    const localDrivers = [
      {
        id: 1,
        first_name: "João",
        last_name: "Silva",
        profile_image_url:
          "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
        car_image_url:
          "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
        car_seats: 2, // Representa o perfil da mota dobrável nesta fase de teste
        rating: "4.95",
      },
      {
        id: 2,
        first_name: "Miguel",
        last_name: "Costa",
        profile_image_url:
          "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
        car_image_url:
          "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        car_seats: 2,
        rating: "4.85",
      },
      {
        id: 3,
        first_name: "Tiago",
        last_name: "Ferreira",
        profile_image_url:
          "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
        car_image_url:
          "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
        car_seats: 2,
        rating: "4.75",
      },
      {
        id: 4,
        first_name: "André",
        last_name: "Santos",
        profile_image_url:
          "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
        car_image_url:
          "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
        car_seats: 2,
        rating: "4.90",
      },
    ];

    return Response.json({ data: localDrivers });
  } catch (error) {
    console.error("Erro ao carregar motoristas locais:", error);
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
scooter_model: "Mota Elétrica Dobrável (18kg)"