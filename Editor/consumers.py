from channels.generic.websocket import AsyncWebsocketConsumer


class EditorConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'editor_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print('disconnect')
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def receive(self, text_data):
        print(f'Data received: {text_data}')
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_message',
                'value': text_data
            }
        )

    async def send_message(self, event):
        # print(f"incoming : {event['value']}")
        await self.send(event['value'])