"""updated table

Revision ID: 748185d9b598
Revises: b49d10250371
Create Date: 2023-04-25 20:36:36.081480

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '748185d9b598'
down_revision = 'b49d10250371'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('checklists', schema=None) as batch_op:
        batch_op.add_column(sa.Column('education', sa.String(), nullable=True))

    with op.batch_alter_table('procedures', schema=None) as batch_op:
        batch_op.add_column(sa.Column('service_line', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('procedures', schema=None) as batch_op:
        batch_op.drop_column('service_line')

    with op.batch_alter_table('checklists', schema=None) as batch_op:
        batch_op.drop_column('education')

    # ### end Alembic commands ###