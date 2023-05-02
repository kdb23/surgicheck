"""working through validates

Revision ID: 216354807b97
Revises: bd099e56b192
Create Date: 2023-05-02 16:43:05.111918

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '216354807b97'
down_revision = 'bd099e56b192'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###
