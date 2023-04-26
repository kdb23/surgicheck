"""deletion of covid test for checklist

Revision ID: e4c0bfa1da84
Revises: 208e91266c4c
Create Date: 2023-04-26 12:47:43.306634

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e4c0bfa1da84'
down_revision = '208e91266c4c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('checklists', schema=None) as batch_op:
        batch_op.drop_column('covid_test')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('checklists', schema=None) as batch_op:
        batch_op.add_column(sa.Column('covid_test', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
