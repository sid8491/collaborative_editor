import json, datetime

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from Editor.models import EditorContent


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
        json_data = json.loads(text_data)
        if json_data.get('event') in ['chat_joined', 'value_update']:
            await self.save_data(json_data)
        if json_data.get('event') == 'chat_joined':
            text_data = await self.get_data(json_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_message',
                'value': text_data
            }
        )

    async def send_message(self, event):
        print(f"Sending Data: {event['value']}")
        await self.send(event['value'])

    @database_sync_to_async
    def save_data(self, data):
        if data.get('event') == 'chat_joined':
            doc_save, created = EditorContent.objects.get_or_create(doc_id=self.room_group_name, defaults={
                'created_at': datetime.datetime.now(),
                'created_by': data.get('name')
            })
        elif data.get('event') == 'value_update':
            doc_save, created = EditorContent.objects.update_or_create(doc_id=self.room_group_name, defaults={
                'language': data.get('language'),
                'content': data.get('value'),
                'updated_at': datetime.datetime.now(),
                'updated_by': data.get('name')
            })


    @database_sync_to_async
    def get_data(self, data):
        db_data = EditorContent.objects.get(doc_id=self.room_group_name)
        data['value'] = db_data.content
        data['language'] = db_data.language
        return json.dumps(data)
