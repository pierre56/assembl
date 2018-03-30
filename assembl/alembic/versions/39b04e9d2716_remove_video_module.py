# -*- coding=utf-8 -*-
"""Remove_video_module

Revision ID: 39b04e9d2716
Revises: e7b56b85b1f5
Create Date: 2018-03-29 15:48:51.279118

"""

# revision identifiers, used by Alembic.
revision = '39b04e9d2716'
down_revision = 'e7b56b85b1f5'

from alembic import context, op
import sqlalchemy as sa
import transaction


from assembl.lib import config


def upgrade(pyramid_env):

    # Do stuff with the app's models here.
    from assembl import models as m
    db = m.get_session_maker()()
    with transaction.manager:
        db.delete(db.query(m.LandingPageModuleType).filter(m.LandingPageModuleType.identifier == u"VIDEO").first())
        lpmt = db.query(m.LandingPageModuleType).filter(m.LandingPageModuleType.identifier == u"INTRODUCTION").first()
        ls = lpmt.title
        ls.add_value(u"Text & Multi-Media", "en")

        # ls.add_entry(m.LangStringEntry(langstring=ls, value=u"Text & Multi-Media", locale_id=m.Locale.get_id_of("en")))
        ls.add_value(u"Texte & Multi-Médias", "fr")
        db.flush()


def downgrade(pyramid_env):

    from assembl import models as m
    db = m.get_session_maker()()
    with transaction.manager:
        ls = m.LangString.create(u'Video', 'en')
        ls.add_value(u'Vidéo', 'fr')
        db.add(m.LandingPageModuleType(
            identifier="VIDEO",
            title=ls,
            default_order=6.0,
            editable_order=True,
            required=False))
        lpmt = db.query(m.LandingPageModuleType).filter(m.LandingPageModuleType.identifier == u"INTRODUCTION").first()
        ls = lpmt.title
        ls.add_entry(m.LangStringEntry(langstring=ls, value=u"Introduction", locale_id=m.Locale.get_id_of("en")))
        ls.add_entry(m.LangStringEntry(langstring=ls, value=u"Introduction", locale_id=m.Locale.get_id_of("fr")))
        db.flush()
