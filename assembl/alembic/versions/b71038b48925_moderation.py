"""moderation

Revision ID: b71038b48925
Revises: de9ade82771c
Create Date: 2018-12-03 11:41:29.126641

"""

# revision identifiers, used by Alembic.
revision = 'b71038b48925'
down_revision = 'de9ade82771c'

from alembic import context, op
import sqlalchemy as sa
import transaction


from assembl.lib import config


def upgrade(pyramid_env):
    with context.begin_transaction():
        op.add_column('preferences',
                sa.Column('withModeration', sa.Boolean(), default=False, server_default='0'))


def downgrade(pyramid_env):
    with context.begin_transaction():
        op.drop_column('preferences', 'withModeration')
